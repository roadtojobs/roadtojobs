export const getNodeColor = (color: string): string => {
  switch (color) {
    case 'gray':
      return 'bg-gray-100 text-gray-800';
    case 'pink':
      return 'bg-pink-100 text-pink-800';
    case 'purple':
      return 'bg-purple-100 text-purple-800';
    case 'indigo':
      return 'bg-indigo-100 text-indigo-800';
    case 'yellow':
      return 'bg-yellow-100 text-yellow-800';
    case 'sky':
      return 'bg-sky-100 text-sky-800';
    case 'blue':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-rose-100 text-rose-800';
  }
};
