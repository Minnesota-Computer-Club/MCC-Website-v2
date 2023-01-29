export default function PageTitle(props) {
  return (
    <>
      <h1 className="py-1 font-extrabold text-transparent text-3xl md:text-5xl bg-clip-text bg-gradient-to-r from-lightpurple to-darkpurple">{props.title}</h1>
      <p className="font-medium mt-1">Minnesota Computer Club</p>
    </>
  );
}