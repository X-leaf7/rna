import { User, LoginCredentials, RegisterCredentials, IAuthService } from '../types';

class AuthService implements IAuthService {
  private users: User[] = [
    {
      id: '1',
      email: 'demo@getver.io',
      name: 'Demo User',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=face',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
    }
  ];

  private currentUser: User | null = null;

  async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = this.users.find(u => u.email === credentials.email);
    
    if (!user || credentials.password !== 'demo123') {
      throw new Error('Invalid email or password');
    }

    this.currentUser = user;
    return user;
  }

  async register(credentials: RegisterCredentials): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const existingUser = this.users.find(u => u.email === credentials.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: credentials.email,
      name: credentials.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    return newUser;
  }

  async logout(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    this.currentUser = null;
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!this.currentUser) {
      throw new Error('No user logged in');
    }

    const updatedUser = {
      ...this.currentUser,
      ...data,
      updatedAt: new Date(),
    };

    const userIndex = this.users.findIndex(u => u.id === this.currentUser!.id);
    if (userIndex !== -1) {
      this.users[userIndex] = updatedUser;
    }

    this.currentUser = updatedUser;
    return updatedUser;
  }
}

export const authService = new AuthService();