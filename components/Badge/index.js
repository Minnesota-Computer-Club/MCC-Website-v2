// This indicator badge was created by modifying a Tailwind UI badge component.
// https://tailwindui.com/components/application-ui/elements/badges

const colors = {
  "green": {
    "background": "bg-green-100",
    "text": "text-green-800"
  },
  "red": {
    "background": "bg-red-100",
    "text": "text-red-800"
  },
  "yellow": {
    "background": "bg-yellow-100",
    "text": "text-yellow-800",
  },
};

export default function Badge(props) {
  return (
    <span className={`inline-flex items-center rounded-full ${colors[props.color || "yellow"].background} px-3 py-0.5 text-sm font-medium ${colors[props.color || "yellow"].text}`}>
      <svg className="-ml-0.5 mr-1.5 h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
        <circle cx={4} cy={4} r={3} />
      </svg>
      <div>{props.msg || ""}</div>
    </span>
  );
}