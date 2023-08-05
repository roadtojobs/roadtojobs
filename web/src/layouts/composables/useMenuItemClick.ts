import { MenuItem } from '@/types/layout';
import { useRouter } from 'vue-router';

type UseMenuItemClickProps = {
  onBeforeHandle?: (menuItem: MenuItem) => void;
};

type UseMenuItemClickReturn = {
  onMenuItemClick: (menuItem: MenuItem) => void;
};

export default function useMenuItemClick({
  onBeforeHandle,
}: UseMenuItemClickProps): UseMenuItemClickReturn {
  const router = useRouter();

  return {
    onMenuItemClick: (menuItem: MenuItem): void => {
      onBeforeHandle?.(menuItem);

      if (menuItem.routeName) {
        router.push({
          name: menuItem.routeName,
        });

        return;
      }

      if (menuItem.onClick) {
        menuItem.onClick(menuItem);
      }
    },
  };
}
