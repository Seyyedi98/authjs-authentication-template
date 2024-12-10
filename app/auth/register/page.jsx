import { CredentialsRegisterForm } from "@/app/_components/auth/credentials-register-form";
import { MobileLoginForm } from "@/app/_components/auth/mobile-login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => {
  return (
    <Tabs defaultValue="phonenumber" className="w-[380px] md:w-[400px]">
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
          <CredentialsRegisterForm />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default page;
