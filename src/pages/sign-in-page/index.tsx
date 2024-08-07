import HelmetComponent from '@/components/helmet';
import SingIn from '@/features/auth/singIn';

function SignInPage() {

  return (
    <HelmetComponent title="sign in">
      <SingIn />
    </HelmetComponent>
  )
}

export default SignInPage