import ButtonsNavbar from "./ButtonsNavbar";

export default function NavbarId({title}: {title?: string}) {
  return(
    <div className="flex justify-between items-center">
      <h1 className="font-bold text-primary">{title}</h1>
      <ButtonsNavbar/>
    </div>
  )
}