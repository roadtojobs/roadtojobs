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
    case 'lime':
      return 'bg-lime-100 text-lime-800';
    case 'emerald':
      return 'bg-emerald-100 text-emerald-800';
    case 'orange':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-rose-100 text-rose-800';
  }
};
