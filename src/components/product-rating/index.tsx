import { createRandomArray } from '@/utils/create-random-array';
import { roundNumber } from '@/utils/round-number';
import StarIcon from '../icon-components/star';
import HalfStarIcon from '../icon-components/half-star';
import EmptyStarIcon from '../icon-components/empty-star';
import { Flex } from 'antd';
import classNames from 'classnames';
import ratingStyles from './rating.module.scss';

interface IProductRatingProps {
  rating: number;
  className?: string;
  iconSize?: number;
  shouldShowScore?: boolean;
}

function ProductRating({ rating, className, shouldShowScore, iconSize = 12 }: IProductRatingProps) {
  /** Round the rating score
        ex:
            + 3.45 will be rounded to 3.5
            + 3.89 will be rounded to 4
            + 3.24 will be rounded to 3

        Calculate the num of empty start, solid star
            and haflStar to render
            based on the ratingScore
    */
  const roundedRating = roundNumber(rating);
  const remainder = roundedRating % 1;
  const emptyStar = (remainder ? 4.5 : 5) - roundedRating;

  return (
    <Flex
      className={classNames(className, ratingStyles.wrapper)}
      gap={4}>
      {createRandomArray(roundedRating).map((id) => (
        <StarIcon
          key={id}
          width={iconSize}
          height={iconSize}
        />
      ))}
      {remainder ? (
        <HalfStarIcon
          width={iconSize}
          height={iconSize}
        />
      ) : (
        <></>
      )}
      {emptyStar ? (
        createRandomArray(emptyStar).map((id) => (
          <EmptyStarIcon
            key={id}
            width={iconSize}
            height={iconSize}
          />
        ))
      ) : (
        <></>
      )}

      {shouldShowScore && <span className='score'>{roundedRating !== 0 ? roundedRating : 0}</span>}
    </Flex>
  );
}

export default ProductRating;
