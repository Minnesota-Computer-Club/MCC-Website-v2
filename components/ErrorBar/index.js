// This error banner was created by modifying a Tailwind UI Alert component.
// https://tailwindui.com/components/application-ui/feedback/alerts

// Import required dependencies.
import { XCircleIcon } from '@heroicons/react/20/solid';

export default function ErrorBar(props) {
  return (
    <div className="rounded-md bg-red-50 p-4 my-8">
      <div className="flex">
        <div className="shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error{props.errorCode ? " " + String(props.errorCode) : ""}: {props.errorMsg ? props.errorMsg : ""} Please contact a website administrator.</h3>
        </div>
      </div>
    </div>
  );
}
