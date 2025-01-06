import { SheetMenu } from "./SheetMenu";
import { UserButton } from "./UserButton";


interface NavbarProps {
  title: string;
}
export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 h-[52px] flex-shrink-0 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-full items-center justify-between gap-2">
        <div className="flex items-center gap-4 lg:gap-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <>
          
          <UserButton />
        </>
      </div>
    </header>
  );
}