// types/express-session.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      type: 'user' | 'admin';
      id: number;
      name: string;
      email: string;
      role: string;
    };
    cart?: Array<{
      user_id: number;
      donation_amount: number;
      charity_id: number;
    }>;
  }
}
