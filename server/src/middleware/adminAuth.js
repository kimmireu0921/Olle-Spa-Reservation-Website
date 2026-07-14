function adminAuth(req, res, next) {
  const key = req.header('x-admin-key');
  if (!key || key !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
}

module.exports = adminAuth;
