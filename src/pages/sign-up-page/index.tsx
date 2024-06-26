import HelmetComponent from '@/components/helmet';
import SignUp from '@/features/auth/singUp';

function SignUpPage() {

  return (
    <HelmetComponent title="[do go thanh lanh] sign up">
      <SignUp />
    </HelmetComponent>
  )
}

export default SignUpPage