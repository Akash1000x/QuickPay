import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between border-b border-slate-300 px-4">
      <div className="text-lg flex flex-col justify-center font-bold">
        QuickPay
      </div>
      <div className="flex justify-center pt-2">
        {user?.name && (
          <div className="flex justify-center items-center capitalize font-bold rounded-lg text-xl px-5 py-2.5 me-2 mb-2 h-10 mr-2">
            {user?.name}
          </div>
        )}
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
