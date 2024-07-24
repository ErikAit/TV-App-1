// CSS Import
import './menu-styles/Menu.css';
import { useFocusStore, useMenuTitle } from '../../requests/requests';

export default function Menu() {
  const isFirstSelected = useFocusStore((state) => state.isFirstSelected);
  const focusedTitle = useFocusStore((state) => state.focusedTitle);
  const setFocusedTitle = useFocusStore((state) => state.setFocusedTitle);
  const { menuTitles } = useMenuTitle();

  return (
    <div className={`menu__container ${isFirstSelected ? 'active' : ''}`}>
      <div className='menu__content'>
        <div className="categories__container">
          <div className="bx bx-home-alt"></div>
          <div className='bx bx-search'></div>
          <div className='bx bx-tv'></div>
          <div className='bx bxs-camera-movie'></div>
          <div className='bx bx-desktop'></div>
          <div className='bx bx-heart'></div>
        </div>

        <div className="categories__container">
          <div className='bx bxs-user'></div>
          <div className='bx bx-cog'></div>
          <div className='bx bx-power-off'></div>
        </div>
      </div>

      <div className="open__menu__container">
        <div className="open__menu__content">
          <div>
            {menuTitles.slice(0, 6).map((menu, index) => (
              <div key={menu.id}>
                <span
                  className={index === focusedTitle ? 'focused' : ''}
                  onMouseEnter={() => setFocusedTitle(index)}
                >
                  {menu.title}
                </span>
              </div>
            ))}
          </div>

          <div>
            {menuTitles.slice(6).map((menu, index) => (
              <div key={menu.id}>
                <span
                  className={index + 6 === focusedTitle ? 'focused' : ''}
                  onMouseEnter={() => setFocusedTitle(index + 6)}
                >
                  {menu.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}