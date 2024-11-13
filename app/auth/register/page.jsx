import { CredentialsRegisterForm } from "@/app/_components/auth/credentials-register-form";
import { MobileRegisterForm } from "@/app/_components/auth/mobile-register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => {
  return (
    <Tabs defaultValue="phonenumber" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="phonenumber">Phone Number</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
      </TabsList>
      <TabsContent value="phonenumber">
        <div className="animate-fade-left">
          <MobileRegisterForm />
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
