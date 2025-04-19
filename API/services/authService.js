const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// Register a new user
exports.register = async (userData) => {
  const { email, password, name, userType } = userData;
  
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      userType: userType || 'FREE_TRIAL'
    }
  });
  
  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Login user
exports.login = async (email, password) => {
  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }
  
  // Create session
  const sessionId = uuidv4();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // Session expires in 7 days
  
  const session = await prisma.session.create({
    data: {
      id: sessionId,
      userId: user.id,
      expiresAt
    }
  });
  
  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, sessionId };
};

// Logout user
exports.logout = async (sessionId) => {
  await prisma.session.delete({ where: { id: sessionId } });
  return true;
};

// Get user by session
exports.getUserBySession = async (sessionId) => {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true }
  });
  
  if (!session || session.expiresAt < new Date()) {
    if (session) {
      // Delete expired session
      await prisma.session.delete({ where: { id: sessionId } });
    }
    return null;
  }
  
  // Remove password from response
  const { password: _, ...userWithoutPassword } = session.user;
  return userWithoutPassword;
};