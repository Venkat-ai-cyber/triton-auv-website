import urllib.request
import urllib.parse
import json
import http.cookiejar
import time
import sys

BASE_URL = "http://localhost:5000"

# Setup cookie jar for persistent session testing
cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

def post(url, data):
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json', 'Accept': 'application/json'}
    )
    with opener.open(req) as resp:
        return json.loads(resp.read().decode('utf-8'))

def get(url):
    req = urllib.request.Request(url, headers={'Accept': 'application/json'})
    with opener.open(req) as resp:
        return json.loads(resp.read().decode('utf-8'))

print("=== 1. Testing Health Endpoint ===")
res = get(f"{BASE_URL}/health")
assert res['status'] == 'ok', "Health check failed"
print("✓ Health check OK:", res)

print("\n=== 2. Testing Technical Config Endpoint ===")
res = get(f"{BASE_URL}/api/technical/config")
assert res['success'] == True, "Technical config failed"
assert res['config']['identity']['product'] == 'TRITON', "Product name mismatch"
assert res['config']['specifications']['thrusterCount'] == 8, "Thruster count mismatch"
assert res['config']['ai']['model'] == 'YOLOv11', "AI model must be YOLOv11"
print("✓ Technical Config verified: TRITON 8-Thruster, YOLOv11")

print("\n=== 3. Testing User Registration & CSV Persistence ===")
test_email = f"sponsor_{int(time.time())}@marine-tech.org"
reg_data = {
    "name": "Commander Ramesh",
    "companyName": "Naval Systems Lab",
    "email": test_email,
    "password": "SubseaPassword2026",
    "confirmPassword": "SubseaPassword2026"
}
res = post(f"{BASE_URL}/api/auth/register", reg_data)
assert res['success'] == True, "Registration failed"
assert res['user']['email'] == test_email.lower(), "Email mismatch"
print("✓ Registered user:", res['user']['name'], res['user']['email'], "ID:", res['user']['id'])

print("\n=== 4. Testing Duplicate Email Prevention ===")
try:
    post(f"{BASE_URL}/api/auth/register", reg_data)
    print("❌ Failed: Duplicate email was permitted!")
    sys.exit(1)
except urllib.error.HTTPError as e:
    err_body = json.loads(e.read().decode('utf-8'))
    print("✓ Duplicate registration correctly rejected (400):", err_body['message'])

print("\n=== 5. Testing Session Persistence (GET /api/auth/me) ===")
res = get(f"{BASE_URL}/api/auth/me")
assert res['authenticated'] == True, "User session not authenticated"
assert res['user']['email'] == test_email.lower(), "Session user mismatch"
print("✓ Session persisted via HTTP-only cookie for:", res['user']['email'])

print("\n=== 6. Testing Protected Dashboard Route (GET /api/dashboard/overview) ===")
res = get(f"{BASE_URL}/api/dashboard/overview")
assert res['success'] == True, "Dashboard access failed"
assert 'stats' in res, "Dashboard stats missing"
print("✓ Protected dashboard returned:", res['stats']['accessLevel'])

print("\n=== 7. Testing Logout ===")
res = post(f"{BASE_URL}/api/auth/logout", {})
assert res['success'] == True, "Logout failed"
res = get(f"{BASE_URL}/api/auth/me")
assert res['authenticated'] == False, "Session still active after logout"
print("✓ Logged out successfully. Session revoked.")

print("\n=== 8. Testing Protected Route Rejection After Logout ===")
try:
    get(f"{BASE_URL}/api/dashboard/overview")
    print("❌ Failed: Protected route accessible after logout!")
    sys.exit(1)
except urllib.error.HTTPError as e:
    assert e.code == 401, f"Expected 401, got {e.code}"
    print("✓ Protected route correctly rejected (401 Unauthorized)")

print("\n=== 9. Testing Login with Created Account ===")
login_res = post(f"{BASE_URL}/api/auth/login", {
    "email": test_email,
    "password": "SubseaPassword2026"
})
assert login_res['success'] == True, "Login failed"
assert login_res['user']['email'] == test_email.lower(), "Logged in user mismatch"
print("✓ Login successful for:", login_res['user']['name'])

print("\n=== 10. Testing Invalid Password Rejection ===")
try:
    post(f"{BASE_URL}/api/auth/login", {
        "email": test_email,
        "password": "WrongPassword999"
    })
    print("❌ Failed: Invalid password was accepted!")
    sys.exit(1)
except urllib.error.HTTPError as e:
    assert e.code == 401, f"Expected 401, got {e.code}"
    print("✓ Invalid login correctly rejected (401)")

print("\n=== 11. Testing Sponsorship Enquiry Submission ===")
enq_res = post(f"{BASE_URL}/api/contact/enquiry", {
    "name": "Commander Ramesh",
    "email": test_email,
    "organisation": "Naval Systems Lab",
    "category": "Hardware and Component Sponsorship",
    "message": "Interested in evaluating TRITON 8-thruster propulsion for subsea inspection."
})
assert enq_res['success'] == True, "Enquiry failed"
print("✓ Sponsorship enquiry successfully recorded:", enq_res['message'])

print("\n========================================================")
print("   ALL 11 BACKEND END-TO-END TESTS PASSED WITH 100% SUCCESS")
print("========================================================")
