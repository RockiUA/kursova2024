import { FC } from 'react';
import { useReactiveVar } from '@apollo/client';
import { City } from '@generated';
import CheckIcon from '@mui/icons-material/Check';
import { Chip, ListItem, ListItemButton, Typography } from '@mui/joy';
import classNames from 'classnames';
import { useSearchItemList } from '@hooks/weather/use-search-item-list';
import { userCitiesIds } from '@lib/apollo/apollo-constants';
import styles from './city-item.module.css';

interface CityItemProps {
  item: City;
  closeList: () => void;
}

export const CityItem: FC<CityItemProps> = ({ item, closeList }) => {
  const idList = useReactiveVar(userCitiesIds);
  const { isAddCityPerforming, addUserCity } = useSearchItemList({ closeList });
  const added = idList.includes(item.id);

  return (
    <ListItem nested tabIndex={-1}>
      <ListItemButton
        disabled={isAddCityPerforming || added}
        onClick={() => addUserCity(item)}
        className={classNames(styles.content, { [styles.disabledContent]: added })}
      >
        <Typography level="body1">
          {item.name}, {item.country}
        </Typography>

        {added && (
          <Chip variant="soft" color="success" className={styles.check}>
            <CheckIcon />
          </Chip>
        )}
      </ListItemButton>
    </ListItem>
  );
};
