import ComponentDemo from "@/pages/ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Button, Input, Card } from "@/components";
import { PasswordInput } from "@/components/Input/PasswordInput";
import { FloatingLabelInput } from "@/components/Input";


const FormsPage = () => {
  const loginFormCode = `import { Card, Input, PasswordInput, Button } from "easeui";

export const LoginForm = () => (
  <Card variant="light" className="max-w-sm mx-auto shadow-xl" animate>
    <div className="space-y-6 p-2">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <p className="text-gray-500 text-sm">Enter your credentials to access your account</p>
      </div>
      
      <div className="space-y-4">
        <Input label="Email address" placeholder="hello@easeui.com" tone="default" />
        <PasswordInput label="Password" />
        
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            <span className="text-gray-600 dark:text-gray-400">Remember me</span>
          </label>
          <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">Forgot password?</a>
        </div>
      </div>
      
      <Button variant="primary" className="w-full" hoverAnimation="shadowPulse">
        Sign in
      </Button>
    </div>
  </Card>
);`;

  const registrationFormCode = `import { Card, FloatingLabelInput, PasswordInput, Button } from "easeui";

export const RegistrationForm = () => (
  <Card variant="outline" className="max-w-md mx-auto" animate hoverAnimation="float3D">
    <div className="space-y-8 p-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Create an account</h2>
        <p className="text-gray-500 text-sm">Join thousands of developers building better UIs.</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FloatingLabelInput label="First name" placeholder="" />
          <FloatingLabelInput label="Last name" placeholder="" />
        </div>
        
        <FloatingLabelInput label="Email address" placeholder="" />
        <PasswordInput label="Create password" />
      </div>
      
      <div className="space-y-4">
        <Button variant="primary" className="w-full" hoverAnimation="jiggle">
          Create Account
        </Button>
        <p className="text-center text-sm text-gray-500">
          Already have an account? <a href="#" className="text-indigo-600 font-medium">Log in</a>
        </p>
      </div>
    </div>
  </Card>
);`;

  const propsData = [
    {
      prop: "components",
      type: "Various",
      default: "-",
      description: "Forms are composed of Input, Button, Card, and layout utilities.",
    },
    {
      prop: "validation",
      type: "State",
      default: "-",
      description: "Use the `tone=\"error\"` and `error=\"...\"` props on Inputs to show validation states.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Forms</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Combine Input, Button, and Card components to create beautiful, accessible forms.
        </p>
      </div>

      <section className="space-y-4 flex flex-col gap-10">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Login Form</h3>
          <ComponentDemo code={loginFormCode}>
            <Card variant="light" className="max-w-sm w-full mx-auto shadow-xl dark:shadow-none" animate>
              <div className="space-y-6 p-2">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Welcome back</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Enter your credentials to access your account</p>
                </div>
                
                <div className="space-y-4">
                  <Input label="Email address" placeholder="hello@easeui.com" tone="default" />
                  <PasswordInput label="Password" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                      <span className="text-gray-600 dark:text-gray-400">Remember me</span>
                    </label>
                    <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">Forgot password?</a>
                  </div>
                </div>
                
                <Button variant="primary" className="w-full" hoverAnimation="shadowPulse">
                  Sign in
                </Button>
              </div>
            </Card>
          </ComponentDemo>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Registration Form</h3>
          <ComponentDemo code={registrationFormCode}>
            <Card variant="outline" className="max-w-md w-full mx-auto" animate hoverAnimation="float3D">
              <div className="space-y-8 p-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Create an account</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Join thousands of developers building better UIs.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingLabelInput label="First name" placeholder="" />
                    <FloatingLabelInput label="Last name" placeholder="" />
                  </div>
                  
                  <FloatingLabelInput label="Email address" placeholder="" />
                  <PasswordInput label="Create password" />
                </div>
                
                <div className="space-y-4">
                  <Button variant="primary" className="w-full" hoverAnimation="jiggle">
                    Create Account
                  </Button>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Already have an account? <a href="#" className="text-indigo-600 font-medium">Log in</a>
                  </p>
                </div>
              </div>
            </Card>
          </ComponentDemo>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Composition Guidelines</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default FormsPage;
