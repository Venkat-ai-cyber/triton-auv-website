import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { requireAuth } from '../middleware/authMiddleware.js';
import { sponsorshipService } from '../services/sponsorshipService.js';

const router = Router();
const CONFIG_PATH = path.resolve(__dirname, '../../../shared/tritonTechnicalConfig.json');

// Public route to fetch central technical config
router.get('/technical/config', (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const data = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
      return res.json({ success: true, config: data });
    }
    return res.status(404).json({ success: false, message: 'Technical config not found.' });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Public route returning LAN IPv4 addresses for mobile QR scanning
router.get('/network-info', (_req: Request, res: Response) => {
  const interfaces = os.networkInterfaces();
  const addresses: string[] = [];
  for (const iface of Object.values(interfaces)) {
    if (!iface) continue;
    for (const info of iface) {
      if (info.family === 'IPv4' && !info.internal) {
        addresses.push(info.address);
      }
    }
  }
  return res.json({
    success: true,
    lanIps: addresses,
    suggestedUrl: addresses.length > 0 ? `http://${addresses[0]}:5173/` : 'http://localhost:5173/'
  });
});

// Contact / Sponsorship enquiry submission -> persisted in backend/data/sponsorships.csv
router.post('/contact/enquiry', async (req: Request, res: Response) => {
  try {
    const { name, email, organisation, category, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email).trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const savedRecord = await sponsorshipService.addEnquiry({
      name: String(name),
      email: String(email),
      organisation: organisation ? String(organisation) : 'N/A',
      category: category ? String(category) : 'General Enquiry',
      message: String(message)
    });

    return res.status(201).json({
      success: true,
      enquiry: savedRecord,
      message: 'Sponsorship enquiry stored in sponsorships.csv. Team Triton and Ashok (+91 98844 69962) have received your details.'
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Protected route: view sponsorship enquiries stored in sponsorships.csv
router.get('/sponsorships', requireAuth, async (_req: Request, res: Response) => {
  try {
    const enquiries = await sponsorshipService.getAllSponsorships();
    return res.json({ success: true, count: enquiries.length, sponsorships: enquiries });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Protected Dashboard Overview Route
router.get('/dashboard/overview', requireAuth, async (req: Request, res: Response) => {
  const user = req.session.user!;
  const sponsorships = await sponsorshipService.getAllSponsorships();
  res.json({
    success: true,
    user,
    stats: {
      registeredStatus: 'Verified Partner / Technical Collaborator',
      accessLevel: 'Tier-1 Technical Documentation & CAD Vault',
      platform: 'TRITON AUV (Team Triton)',
      systemHealth: 'Online & Fully Operational',
      sponsorshipEnquiriesCount: sponsorships.length
    }
  });
});

export default router;
