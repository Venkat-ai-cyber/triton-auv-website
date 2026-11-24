import { Request, Response } from 'express';
import { userService } from '../services/userService.js';

export class AuthController {
  /**
   * POST /api/auth/register
   */
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, companyName, email, password, confirmPassword } = req.body;

      // Server-side validation
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        res.status(400).json({ success: false, message: 'Full Name must be at least 2 characters long.' });
        return;
      }

      if (!companyName || typeof companyName !== 'string' || companyName.trim().length < 1) {
        res.status(400).json({ success: false, message: 'Company or Organisation Name is required.' });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
        res.status(400).json({ success: false, message: 'A valid email address is required.' });
        return;
      }

      if (!password || typeof password !== 'string' || password.length < 8) {
        res.status(400).json({ success: false, message: 'Password must be at least 8 characters long.' });
        return;
      }

      if (password !== confirmPassword) {
        res.status(400).json({ success: false, message: 'Passwords do not match.' });
        return;
      }

      // Check if password has basic complexity (letters and numbers)
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      if (!hasLetter || !hasNumber) {
        res.status(400).json({ success: false, message: 'Password must contain both letters and numbers.' });
        return;
      }

      const user = await userService.registerUser({
        name: name.trim(),
        companyName: companyName.trim(),
        email: email.trim().toLowerCase(),
        password,
        confirmPassword
      });

      // Automatically sign in upon registration
      req.session.user = user;

      res.status(201).json({
        success: true,
        message: 'Account successfully registered and persistent record created.',
        user
      });
    } catch (err: any) {
      console.error('[AuthController.register] Error:', err);
      res.status(400).json({
        success: false,
        message: err.message || 'Registration failed due to a server error.'
      });
    }
  }

  /**
   * POST /api/auth/login
   */
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ success: false, message: 'Email and password are required.' });
        return;
      }

      const cleanEmail = email.toLowerCase().trim();
      const user = await userService.findByEmail(cleanEmail);

      if (!user) {
        // Uniform message to avoid user enumeration
        res.status(401).json({ success: false, message: 'Invalid email address or password.' });
        return;
      }

      const isValid = await userService.verifyPassword(user, password);
      if (!isValid) {
        res.status(401).json({ success: false, message: 'Invalid email address or password.' });
        return;
      }

      const userResponse = {
        id: user.id,
        name: user.name,
        companyName: user.company_name,
        email: user.email,
        role: user.role,
        createdAt: user.created_at
      };

      req.session.user = userResponse;

      res.status(200).json({
        success: true,
        message: 'Login successful.',
        user: userResponse
      });
    } catch (err: any) {
      console.error('[AuthController.login] Error:', err);
      res.status(500).json({
        success: false,
        message: 'An internal error occurred during login.'
      });
    }
  }

  /**
   * POST /api/auth/logout
   */
  public async logout(req: Request, res: Response): Promise<void> {
    req.session.destroy((err) => {
      if (err) {
        console.error('[AuthController.logout] Error:', err);
        res.status(500).json({ success: false, message: 'Could not log out at this time.' });
        return;
      }
      res.clearCookie('triton.sid');
      res.status(200).json({ success: true, message: 'Logged out successfully.' });
    });
  }

  /**
   * GET /api/auth/me
   */
  public async me(req: Request, res: Response): Promise<void> {
    if (req.session && req.session.user) {
      res.status(200).json({
        success: true,
        authenticated: true,
        user: req.session.user
      });
    } else {
      res.status(200).json({
        success: true,
        authenticated: false,
        user: null
      });
    }
  }
}

export const authController = new AuthController();
