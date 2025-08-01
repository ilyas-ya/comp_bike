interface ActionButtonsProps {
  onCancel: () => void;
}

export function ActionButtons({ onCancel }: ActionButtonsProps) {
  return (
    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 bg-gray-50 -mx-4 -mb-4 px-4 pb-4 rounded-b-lg">
      <button
        onClick={onCancel}
        className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        Cancel
      </button>
    </div>
  );
}
