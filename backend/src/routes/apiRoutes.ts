import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { requireAuth } from '../middleware/authMiddleware.js';

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

// Contact/Sponsorship enquiry submission
router.post('/contact/enquiry', (req: Request, res: Response) => {
  try {
    const { name, email, organisation, category, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const enquiry = {
      id: Date.now().toString(),
      name,
      email,
      organisation: organisation || 'N/A',
      category: category || 'General Enquiry',
      message,
      submittedAt: new Date().toISOString()
    };

    // Save to local enquiries log
    const enquiriesFile = path.resolve(__dirname, '../../data/enquiries.json');
    let list: any[] = [];
    if (fs.existsSync(enquiriesFile)) {
      try {
        list = JSON.parse(fs.readFileSync(enquiriesFile, 'utf8'));
      } catch {}
    }
    list.push(enquiry);
    fs.writeFileSync(enquiriesFile, JSON.stringify(list, null, 2), 'utf8');

    return res.status(200).json({
      success: true,
      message: 'Enquiry received. Team Triton and Ashok (+91 98844 69962) have been logged with your message.'
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Protected Dashboard Overview Route
router.get('/dashboard/overview', requireAuth, (req: Request, res: Response) => {
  const user = req.session.user!;
  res.json({
    success: true,
    user,
    stats: {
      registeredStatus: 'Verified Corporate Partner / Academic Collaborator',
      accessLevel: 'Tier-1 Technical Documentation & CAD Vault',
      platform: 'TRITON AUV (Team Triton)',
      systemHealth: 'Online & Fully Operational'
    }
  });
});

export default router;
