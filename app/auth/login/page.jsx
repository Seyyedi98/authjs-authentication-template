import { CredentialsLoginForm } from "@/app/_components/auth/credentials-login-form";
import { MobileLoginForm } from "@/app/_components/auth/mobile-login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  return (
    <div>
      <Tabs defaultValue="phonenumber" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="phonenumber">Phone Number</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="phonenumber">
          <div className="animate-fade-left">
            <MobileLoginForm />
          </div>
        </TabsContent>
        <TabsContent value="email">
          <div className="animate-fade-left">
            <CredentialsLoginForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
