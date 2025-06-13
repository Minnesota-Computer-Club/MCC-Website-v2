// This information bar was created by modifying a Tailwind UI alert component.
// https://tailwindui.com/components/application-ui/feedback/alerts

// Import required dependencies.
import { InformationCircleIcon } from '@heroicons/react/20/solid';

export default function InfoBar(props) {
  return (
    <div className="rounded-md bg-blue-50 p-4">
      <div className="flex">
        <div className="shrink-0">
          <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-blue-700">{props.msg}</p>
          <p className="mt-3 text-sm md:mt-0 md:ml-6">
            <a href={`${props.href}`} target="_blank" className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600 hover:underline">
              {props.linkLabel}
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}