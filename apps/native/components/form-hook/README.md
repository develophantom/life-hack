# Form Hook Components

This folder contains React Hook Form components with comprehensive validation and security features for the Hack-Life application.

## Components

### RegistrationForm

A comprehensive registration form with the following features:

#### Security Features
- **Password Strength Validation**: Real-time password strength indicator
- **Input Sanitization**: Email normalization and name validation
- **XSS Protection**: Proper input handling and validation
- **CSRF Protection**: Handled by Better Auth
- **Rate Limiting**: Handled by Better Auth server-side

#### Validation Rules

**Name Field:**
- Minimum 2 characters, maximum 50 characters
- Only letters and spaces allowed
- Required field

**Email Field:**
- Valid email format validation
- Maximum 255 characters
- Automatic lowercase conversion
- Required field

**Password Field:**
- Minimum 8 characters, maximum 128 characters
- Must contain at least one lowercase letter
- Must contain at least one uppercase letter
- Must contain at least one number
- Must contain at least one special character (@$!%*?&)
- Real-time strength indicator (Weak/Medium/Strong)

**Confirm Password Field:**
- Must match the password field
- Required field

**Terms and Conditions:**
- Must be accepted to proceed
- Custom checkbox implementation

#### Features
- **Real-time Validation**: Form validates on change
- **Error Handling**: Comprehensive error messages
- **Loading States**: Button shows loading state during submission
- **Password Visibility Toggle**: Show/hide password functionality
- **Keyboard Navigation**: Proper focus management between fields
- **Accessibility**: Proper labels and ARIA attributes
- **Responsive Design**: Works on all screen sizes

#### Usage

```tsx
import { RegistrationForm } from '@/components/form-hook';

export default function RegisterPage() {
  return (
    <View>
      <RegistrationForm />
    </View>
  );
}
```

### LoginForm

A secure login form with comprehensive validation and user experience features:

#### Security Features
- **Input Sanitization**: Email normalization
- **XSS Protection**: Proper input handling and validation
- **CSRF Protection**: Handled by Better Auth
- **Rate Limiting**: Handled by Better Auth server-side
- **Account Verification**: Handles unverified accounts gracefully

#### Validation Rules

**Email Field:**
- Valid email format validation
- Maximum 255 characters
- Automatic lowercase conversion
- Required field

**Password Field:**
- Required field
- Maximum 128 characters
- Password visibility toggle

**Remember Me:**
- Optional checkbox for extended session
- 30-day session extension

#### Features
- **Real-time Validation**: Form validates on change
- **Error Handling**: Comprehensive error messages with specific guidance
- **Loading States**: Button shows loading state during submission
- **Password Visibility Toggle**: Show/hide password functionality
- **Forgot Password**: Integrated password reset functionality
- **Remember Me**: Extended session management
- **Account Verification**: Handles unverified accounts with resend option
- **Keyboard Navigation**: Proper focus management
- **Accessibility**: Proper labels and ARIA attributes
- **Responsive Design**: Works on all screen sizes

#### Error Handling
- **Invalid Credentials**: Clear error messages for wrong email/password
- **Unverified Account**: Prompts user to verify with resend option
- **Network Errors**: Graceful handling of connection issues
- **Server Errors**: User-friendly error messages

#### Usage

```tsx
import { LoginForm } from '@/components/form-hook';

export default function LoginPage() {
  return (
    <View>
      <LoginForm />
    </View>
  );
}
```

## Dependencies

- `react-hook-form`: Form state management
- `@hookform/resolvers`: Zod resolver integration
- `zod`: Schema validation
- `better-auth`: Authentication handling
- `expo-router`: Navigation

## Security Considerations

- All validation happens client-side for UX and server-side for security
- Password strength requirements follow OWASP guidelines
- Email validation prevents common injection attacks
- Input sanitization prevents XSS attacks
- Proper error handling prevents information leakage

## Error Handling

- Network errors are caught and displayed to user
- Validation errors are shown inline with fields
- Server errors are handled gracefully with user-friendly messages
- Loading states prevent double submissions

## Accessibility

- Proper label associations
- Keyboard navigation support
- Screen reader friendly
- High contrast error states
- Focus management