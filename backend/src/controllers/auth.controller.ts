// // // import { Request, Response } from 'express';
// // // import Admin from '../models/admin.model'; // ✅ changed from User to Admin

// // // export const loginUser = async (req: Request, res: Response) => {
// // //   const { admin_email, admin_password } = req.body;

// // //   try {
// // //     const admin = await Admin.findOne({ where: { admin_email } });
// // //     if (!admin) return res.status(401).json({ error: 'Invalid email or password' });

// // //     if (admin.admin_password !== admin_password) {
// // //       return res.status(401).json({ error: 'Invalid email or password' });
// // //     }

// // //     res.json({ message: 'Login successful', admin });
// // //   } catch (error) {
// // //     res.status(500).json({ error: 'Login failed' });
// // //   }
// // // };

// // import { Request, Response } from 'express';
// // import Admin from '../models/admin.model';

// // export const loginUser = async (req: Request, res: Response) => {
// //   const { admin_email, admin_password } = req.body;

// //   try {
// //     const admin = await Admin.findOne({ where: { admin_email } });
// //     if (!admin) return res.status(401).json({ error: 'Invalid email or password' });

// //     if (admin.admin_password !== admin_password) {
// //       return res.status(401).json({ error: 'Invalid email or password' });
// //     }

// //     res.json({ message: 'Login successful', admin });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Login failed' });
// //   }
// // };

// // export const signupAdmin = async (req: Request, res: Response) => {
// //   const {
// //     admin_name,
// //     admin_email,
// //     admin_phone,
// //     admin_password
// //   } = req.body;

// //   try {
// //     const existing = await Admin.findOne({ where: { admin_email } });
// //     if (existing) return res.status(409).json({ error: 'Email already exists' });

// //     const newAdmin = await Admin.create({
// //       admin_name,
// //       admin_email,
// //       admin_phone,
// //       admin_password,
// //       admin_role: 'admin',
// //       admin_created_date_time: new Date()
// //     });

// //     res.status(201).json({ message: 'Signup successful', admin: newAdmin });
// //   } catch (error) {
// //     console.error('Signup error:', error);
// //     res.status(500).json({ error: 'Signup failed' });
// //   }
// // };

// // import { Request, Response } from 'express';
// // import Admin from '../models/admin.model';

// // export const loginUser = async (req: Request, res: Response) => {
// //   const { admin_email, admin_password } = req.body;

// //   try {
// //     const admin = await Admin.findOne({ where: { admin_email } });
// //     if (!admin) return res.status(401).json({ error: 'Invalid email or password' });

// //     if (admin.admin_password !== admin_password) {
// //       return res.status(401).json({ error: 'Invalid email or password' });
// //     }

// //     // ✅ Return only necessary fields (flattened, not wrapped in 'admin')
// //     res.json({
// //       message: 'Login successful',
// //       admin_user_id: admin.admin_user_id,
// //       admin_name: admin.admin_name,
// //       admin_email: admin.admin_email,
// //       admin_phone: admin.admin_phone,
// //       admin_role: admin.admin_role,
// //       is_approved: admin.is_approved
// //     });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Login failed' });
// //   }
// // };

// // export const signupAdmin = async (req: Request, res: Response) => {
// //   const {
// //     admin_name,
// //     admin_email,
// //     admin_phone,
// //     admin_password
// //   } = req.body;

// //   try {
// //     const existing = await Admin.findOne({ where: { admin_email } });
// //     if (existing) return res.status(409).json({ error: 'Email already exists' });

// //     const newAdmin = await Admin.create({
// //       admin_name,
// //       admin_email,
// //       admin_phone,
// //       admin_password,
// //       admin_role: 'admin',
// //       admin_created_date_time: new Date(),
// //       is_approved: false // ✅ add this if you're using it
// //     });

// //     res.status(201).json({ message: 'Signup successful', admin: newAdmin });
// //   } catch (error) {
// //     console.error('Signup error:', error);
// //     res.status(500).json({ error: 'Signup failed' });
// //   }
// // };

// import { Request, Response } from 'express';
// import Admin from '../models/admin.model';

// // ✅ Login controller
// export const loginUser = async (req: Request, res: Response) => {
//   const { admin_email, admin_password } = req.body;

//   try {
//     const admin = await Admin.findOne({ where: { admin_email } });
//     if (!admin) return res.status(401).json({ error: 'Invalid email or password' });

//     if (admin.admin_password !== admin_password) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     res.json({
//       message: 'Login successful',
//       admin_user_id: admin.admin_user_id,
//       admin_name: admin.admin_name,
//       admin_email: admin.admin_email,
//       admin_phone: admin.admin_phone,
//       admin_role: admin.admin_role,
//       is_approved: admin.is_approved
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Login failed' });
//   }
// };

// // ✅ Signup controller
// export const signupAdmin = async (req: Request, res: Response) => {
//   const {
//     admin_name,
//     admin_email,
//     admin_phone,
//     admin_password
//   } = req.body;

//   try {
//     const existing = await Admin.findOne({ where: { admin_email } });
//     if (existing) return res.status(409).json({ error: 'Email already exists' });

//     const newAdmin = await Admin.create({
//       admin_name,
//       admin_email,
//       admin_phone,
//       admin_password,
//       admin_role: 'admin',
//       admin_created_date_time: new Date(),
//       is_approved: false
//     });

//     res.status(201).json({ message: 'Signup successful', admin: newAdmin });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ error: 'Signup failed' });
//   }
// };

// // ✅ Reset password controller
// export const resetAdminPassword = async (req: Request, res: Response) => {
//   const { admin_email, new_password } = req.body;

//   try {
//     const admin = await Admin.findOne({ where: { admin_email } });

//     if (!admin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }

//     admin.admin_password = new_password;
//     await admin.save();

//     res.status(200).json({ message: 'Password reset successful' });
//   } catch (error) {
//     console.error('Reset password error:', error);
//     res.status(500).json({ error: 'Failed to reset password' });
//   }
// };

// import { Request, Response } from 'express';
// import Admin from '../models/admin.model';

// import { Request, Response } from 'express';
// import  Admin  from '../models/admin.model';
// import  User  from '../models/user.model';

// // // ✅ Login controller
// // export const loginUser = async (req: Request, res: Response) => {
// //   const { admin_email, admin_password } = req.body;


// //   try {
// //     const admin = await Admin.findOne({ where: { admin_email } });
// //     if (!admin) return res.status(401).json({ error: 'Invalid email or password' });

// //     if (admin.admin_password !== admin_password) {
// //       return res.status(401).json({ error: 'Invalid email or password' });
// //     }

// //     res.json({
// //       message: 'Login successful',
// //       admin_user_id: admin.admin_user_id,
// //       admin_name: admin.admin_name,
// //       admin_email: admin.admin_email,
// //       admin_phone: admin.admin_phone,
// //       admin_role: admin.admin_role,
// //       is_approved: admin.is_approved
// //     });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Login failed' });
// //   }
// // };




// // export const loginUser = async (req: Request, res: Response) => {
// //   const { admin_email, admin_password } = req.body;

// //   // 🔍 Normalize email to lowercase
// //   const normalizedEmail = admin_email.toLowerCase();

// //   // ✅ Debug logs
// //   console.log('EMAIL:', normalizedEmail);
// //   console.log('PASSWORD:', admin_password);

// //   try {
// //     const admin = await Admin.findOne({ where: { admin_email: normalizedEmail } });

// //     // ✅ Log DB result
// //     console.log('USER FOUND:', admin);

// //     if (!admin) {
// //       return res.status(401).json({ error: 'Invalid email or password' });
// //     }

// //     if (admin.admin_password !== admin_password) {
// //       return res.status(401).json({ error: 'Invalid email or password' });
// //     }

// //     return res.json({
// //       message: 'Login successful',
// //       admin_user_id: admin.admin_user_id,
// //       admin_name: admin.admin_name,
// //       admin_email: admin.admin_email,
// //       admin_phone: admin.admin_phone,
// //       admin_role: admin.admin_role
// //     });


// //   } catch (error) {
// //     console.error('Login error:', error);
// //     return res.status(500).json({ error: 'Login failed' });
// //   }
// // };




// export const loginUser = async (req: Request, res: Response) => {
//   const email = req.body.admin_email || req.body.email;
//   const password = req.body.admin_password || req.body.password;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   const normalizedEmail = email.toLowerCase();
//   console.log('EMAIL:', normalizedEmail);
//   console.log('PASSWORD:', password);

//   try {
//     // 🔍 Try admin login
//     const admin = await Admin.findOne({ where: { admin_email: normalizedEmail } });

//     if (admin) {
//       if (admin.admin_password !== password) {
//         return res.status(401).json({ error: 'Invalid password' });
//       }

//       return res.json({
//         message: 'Login successful (admin)',
//         type: 'admin',
//         admin_user_id: admin.admin_user_id,
//         admin_name: admin.admin_name,
//         admin_email: admin.admin_email,
//         admin_phone: admin.admin_phone,
//         admin_role: admin.admin_role,
//       });
//     }

//     // 🔍 Try user login if not found in admin
//     const user = await User.findOne({ where: { user_email: normalizedEmail } });

//     if (user) {
//       if (user.user_password !== password) {
//         return res.status(401).json({ error: 'Invalid password' });
//       }

//       return res.json({
//         message: 'Login successful (user)',
//         type: 'user',
//         user_id: user.user_id,
//         user_name: user.user_name,
//         user_email: user.user_email,
//         user_phone: user.user_phone,
//         user_role: user.user_role,
//       });
//     }

//     // ❌ Not found in either table
//     return res.status(401).json({ error: 'Invalid email or password' });

//   } catch (error) {
//     console.error('Login error:', error);
//     return res.status(500).json({ error: 'Login failed' });
//   }
// };



// // ✅ Signup controller
// export const signupAdmin = async (req: Request, res: Response) => {
//   const {
//     admin_name,
//     admin_email,
//     admin_phone,
//     admin_password
//   } = req.body;

//   try {
//     const existing = await Admin.findOne({ where: { admin_email } });
//     if (existing) return res.status(409).json({ error: 'Email already exists' });

//     const newAdmin = await Admin.create({
//       admin_name,
//       admin_email,
//       admin_phone,
//       admin_password,
//       admin_role: 'admin',
//       admin_created_date_time: new Date(),
//       is_approved: false
//     });

//     res.status(201).json({ message: 'Signup successful', admin: newAdmin });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ error: 'Signup failed' });
//   }
// };

// // ✅ Reset password controller
// export const resetAdminPassword = async (req: Request, res: Response) => {
//   const { admin_email, new_password } = req.body;

//   try {
//     const admin = await Admin.findOne({ where: { admin_email } });

//     if (!admin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }

//     admin.admin_password = new_password;
//     await admin.save();

//     res.status(200).json({ message: 'Password reset successful' });
//   } catch (error) {
//     console.error('Reset password error:', error);
//     res.status(500).json({ error: 'Failed to reset password' });
//   }
// };

// // ✅ Get currently logged-in admin using email + password (for DB-only auth)
// export const getCurrentAdmin = async (req: Request, res: Response) => {
//   const { admin_email, admin_password } = req.body;

//   try {
//     const admin = await Admin.findOne({ where: { admin_email } });

//     if (!admin || admin.admin_password !== admin_password) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     res.status(200).json({
//       admin_user_id: admin.admin_user_id,
//       admin_name: admin.admin_name,
//       admin_email: admin.admin_email,
//       admin_phone: admin.admin_phone,
//       admin_role: admin.admin_role,
//       // is_approved: admin.is_approved
//     });
//   } catch (error) {
//     console.error('Get current admin error:', error);
//     res.status(500).json({ error: 'Failed to fetch admin info' });
//   }
// };

// import { Request, Response } from 'express';
// import Admin from '../models/admin.model';
// import User from '../models/user.model';

// // ✅ Login controller
// export const loginUser = async (req: Request, res: Response) => {
//   const email = req.body.admin_email || req.body.email;
//   const password = req.body.admin_password || req.body.password;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   const normalizedEmail = email.toLowerCase();
//   console.log('EMAIL:', normalizedEmail);
//   console.log('PASSWORD:', password);

//   try {
//     // 🔍 Try admin login
//     const admin = await Admin.findOne({ where: { admin_email: normalizedEmail } });

//     if (admin) {
//       if (admin.admin_password !== password) {
//         return res.status(401).json({ error: 'Invalid password' });
//       }

//       return res.json({
//         message: 'Login successful (admin)',
//         type: 'admin',
//         admin_user_id: admin.admin_user_id,
//         admin_name: admin.admin_name,
//         admin_email: admin.admin_email,
//         admin_phone: admin.admin_phone,
//         admin_role: admin.admin_role,
//       });
//     }

//     // 🔍 Try user login if not found in admin
//     const user = await User.findOne({ where: { user_email: normalizedEmail } });

//     if (user) {
//       if (user.user_password !== password) {
//         return res.status(401).json({ error: 'Invalid password' });
//       }

//       return res.json({
//         message: 'Login successful (user)',
//         type: 'user',
//         user_id: user.user_id,
//         user_name: user.user_name,
//         user_email: user.user_email,
//         user_phone: user.user_phone,
//         user_role: user.user_role,
//       });
//     }

//     // ❌ Not found in either table
//     return res.status(401).json({ error: 'Invalid email or password' });

//   } catch (error) {
//     console.error('Login error:', error);
//     return res.status(500).json({ error: 'Login failed' });
//   }
// };

// // ✅ Signup controller
// export const signupAdmin = async (req: Request, res: Response) => {
//   const {
//     admin_name,
//     admin_email,
//     admin_phone,
//     admin_password
//   } = req.body;

//   try {
//     const existing = await Admin.findOne({ where: { admin_email } });
//     if (existing) return res.status(409).json({ error: 'Email already exists' });

//     const newAdmin = await Admin.create({
//       admin_name,
//       admin_email,
//       admin_phone,
//       admin_password,
//       admin_role: 'admin',
//       admin_created_date_time: new Date(),
//       is_approved: false
//     });

//     res.status(201).json({ message: 'Signup successful', admin: newAdmin });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ error: 'Signup failed' });
//   }
// };

// // ✅ Reset password controller
// export const resetAdminPassword = async (req: Request, res: Response) => {
//   const { admin_email, new_password } = req.body;

//   try {
//     const admin = await Admin.findOne({ where: { admin_email } });

//     if (!admin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }

//     admin.admin_password = new_password;
//     await admin.save();

//     res.status(200).json({ message: 'Password reset successful' });
//   } catch (error) {
//     console.error('Reset password error:', error);
//     res.status(500).json({ error: 'Failed to reset password' });
//   }
// };

// // ✅ Get currently logged-in admin using email + password (for DB-only auth)
// export const getCurrentAdmin = async (req: Request, res: Response) => {
//   const { admin_email, admin_password } = req.body;

//   try {
//     const admin = await Admin.findOne({ where: { admin_email } });

//     if (!admin || admin.admin_password !== admin_password) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     res.status(200).json({
//       admin_user_id: admin.admin_user_id,
//       admin_name: admin.admin_name,
//       admin_email: admin.admin_email,
//       admin_phone: admin.admin_phone,
//       admin_role: admin.admin_role.toLowerCase(), // ✅ Force lowercase
//       // is_approved: admin.is_approved
//     });
//   } catch (error) {
//     console.error('Get current admin error:', error);
//     res.status(500).json({ error: 'Failed to fetch admin info' });
//   }
// };

import { Request, Response } from 'express';
import Admin from '../models/admin.model';
import User from '../models/user.model';

// ✅ Login controller
// 

// export const loginUser = async (req: Request, res: Response) => {
//   const email = req.body.admin_email || req.body.email;
//   const password = req.body.admin_password || req.body.password;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   const normalizedEmail = email.toLowerCase();

//   try {
//     // 🔍 Try admin login
//     const admin = await Admin.findOne({ where: { admin_email: normalizedEmail } });

//     if (admin) {
//       if (admin.admin_password !== password) {
//         return res.status(401).json({ error: 'Invalid password' });
//       }

//       if (!admin.is_approved) {
//         return res.status(403).json({ error: 'Admin account not approved by SuperAdmin yet' });
//       }

//       return res.json({
//         message: 'Login successful (admin)',
//         admin_user_id: admin.admin_user_id,
//         admin_name: admin.admin_name,
//         admin_email: admin.admin_email,
//         admin_phone: admin.admin_phone,
//         admin_role: admin.admin_role, // 🔑 Return this explicitly
//       });
//     }

//     // 🔍 Try user login if not found in admin
//     const user = await User.findOne({ where: { user_email: normalizedEmail } });

//     if (user) {
//       if (user.user_password !== password) {
//         return res.status(401).json({ error: 'Invalid password' });
//       }

//       return res.json({
//         message: 'Login successful (user)',
//         user_id: user.user_id,
//         user_name: user.user_name,
//         user_email: user.user_email,
//         user_phone: user.user_phone,
//         user_role: user.user_role, // 🔑 Return this explicitly
//       });
//     }

//     return res.status(401).json({ error: 'Invalid email or password' });

//   } catch (error) {
//     console.error('Login error:', error);
//     return res.status(500).json({ error: 'Login failed' });
//   }
// };



export const loginUser = async (req: Request, res: Response) => {
  try {
    // 🔒 Check if body exists
    if (!req.body) {
      return res.status(400).json({ error: 'Missing request body' });
    }

    const email = req.body.admin_email || req.body.email;
    const password = req.body.admin_password || req.body.password;

    // 🔒 Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase();

    // ✅ Try logging in as admin
    const admin = await Admin.findOne({ where: { admin_email: normalizedEmail } });

    if (admin) {
      if (admin.admin_password !== password) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      if (!admin.is_approved) {
        return res.status(403).json({ error: 'Admin account not approved by SuperAdmin yet' });
      }

      // ✅ Store admin session
      req.session.user = {
        type: 'admin',
        id: admin.admin_user_id,
        name: admin.admin_name,
        email: admin.admin_email,
        role: admin.admin_role
      };

      return res.json({
        message: 'Login successful (admin)',
        type: 'admin',
        admin_user_id: admin.admin_user_id,
        admin_role: admin.admin_role
      });
    }

    // ✅ Try logging in as user
    const user = await User.findOne({ where: { user_email: normalizedEmail } });

    if (user) {
      if (user.user_password !== password) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // ✅ Store user session
      req.session.user = {
        type: 'user',
        id: user.user_id,
        name: user.user_name,
        email: user.user_email,
        role: user.user_role
      };

      return res.json({
        message: 'Login successful (user)',
        type: 'user',
        user_id: user.user_id,
        user_role: user.user_role
      });
    }

    // ❌ No matching account
    return res.status(401).json({ error: 'Invalid email or password' });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
};

// ✅ Signup controller
export const signupAdmin = async (req: Request, res: Response) => {
  const {
    admin_name,
    admin_email,
    admin_phone,
    admin_password
  } = req.body;

  try {
    const existing = await Admin.findOne({ where: { admin_email } });
    if (existing) return res.status(409).json({ error: 'Email already exists' });

    const newAdmin = await Admin.create({
      admin_name,
      admin_email,
      admin_phone,
      admin_password,
      admin_role: 'admin',
      admin_created_date_time: new Date(),
      is_approved: false // 🚫 New admins must be approved
    });

    res.status(201).json({ message: 'Signup successful (awaiting approval)', admin: newAdmin });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
};

// ✅ Reset password controller
export const resetAdminPassword = async (req: Request, res: Response) => {
  const { admin_email, new_password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { admin_email } });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    admin.admin_password = new_password;
    await admin.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

// // ✅ Get currently logged-in admin using email + password
// export const getCurrentAdmin = async (req: Request, res: Response) => {
//   const { admin_email, admin_password } = req.body;

//   try {
//     const admin = await Admin.findOne({ where: { admin_email } });

//     if (!admin || admin.admin_password !== admin_password) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     if (!admin.is_approved) {
//       return res.status(403).json({ error: 'Admin account not approved by SuperAdmin yet' });
//     }

//     res.status(200).json({
//       admin_user_id: admin.admin_user_id,
//       admin_name: admin.admin_name,
//       admin_email: admin.admin_email,
//       admin_phone: admin.admin_phone,
//       admin_role: admin.admin_role.toLowerCase(),
//     });
//   } catch (error) {
//     console.error('Get current admin error:', error);
//     res.status(500).json({ error: 'Failed to fetch admin info' });
//   }
// };

export const getCurrentAdmin = async (req: Request, res: Response) => {
  try {
    const sessionUser = req.session.user;

    if (!sessionUser) {
      return res.status(401).json({ error: 'Not logged in' });
    }

    // 🟢 If logged in as admin
    if (sessionUser.type === 'admin') {
      const admin = await Admin.findOne({ where: { admin_email: sessionUser.email } });

      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      return res.json({
        type: 'admin',
        admin_user_id: admin.admin_user_id,
        admin_role: admin.admin_role,
        admin_email: admin.admin_email,
        admin_name: admin.admin_name,
      });
    }

    // 🟢 If logged in as user
    if (sessionUser.type === 'user') {
      const user = await User.findOne({ where: { user_email: sessionUser.email } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json({
        type: 'user',
        user_id: user.user_id,
        user_role: user.user_role,
        user_email: user.user_email,
        user_name: user.user_name,
      });
    }

    return res.status(400).json({ error: 'Invalid session type' });

  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({ error: 'Failed to fetch current user' });
  }
};



export const getLoggedInUser = (req: Request, res: Response) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).json({ message: 'Not logged in' });
  }
  return res.json(user);
};


export const logoutUser = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.clearCookie('connect.sid'); // optional
    res.json({ message: 'Logged out' });
  });
};
