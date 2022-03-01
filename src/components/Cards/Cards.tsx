import React from 'react'
import { css, createArray } from '@fluentui/react/lib/Utilities';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { MarqueeSelection, Selection, IObjectWithKey } from '@fluentui/react/lib/MarqueeSelection';
import { getTheme, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { useBoolean, useConst, useForceUpdate } from '@fluentui/react-hooks';
import { Image } from '@fluentui/react';

type CardsProps = {
    images: [] | undefined;
  };

  interface IPhoto extends IObjectWithKey {
    key:number;
    url: string;
    width: number;
    height: number;
  }
  
  
  
  const theme = getTheme();
  const styles = mergeStyleSets({
    photoList: {
      display: 'inline-block',
      border: '1px solid ' + theme.palette.neutralTertiary,
      margin: 0,
      padding: 10,
      overflow: 'hidden',
      userSelect: 'none',
    },
  
    photoCell: {
      position: 'relative',
      display: 'inline-block',
      margin: 2,
      boxSizing: 'border-box',
      background: theme.palette.neutralLighter,
      lineHeight: 100,
      verticalAlign: 'middle',
      textAlign: 'center',
      selectors: {
        '&.is-selected': {
          background: theme.palette.themeLighter,
          border: '1px solid ' + theme.palette.themePrimary,
        },
      },
    },
    checkbox: {
      margin: '10px 0',
    },
  });

const Cards=({ images }: CardsProps)=>{
    
    //const PHOTOSLIMITED: IPhoto[]=getLimitedPhotos();
    const PHOTOS: IPhoto[] = images!.map((image,index) => {
        const randomWidth = 50 + Math.floor(Math.random() * 150);
        console.log(image);
        return {
          key: index,
          url: image,
          width: randomWidth,
          height: 100,
        };
      });

     

    const forceUpdate = useForceUpdate();
    const selection =new Selection;

    return(<MarqueeSelection selection={selection} >
     
       
        <ul className={styles.photoList}>
          {PHOTOS.map((photo, index) => (
            <div
              key={index}
              className={css(styles.photoCell, selection.isIndexSelected(index) && 'is-selected')}
              data-is-focusable
              data-selection-index={index}
              style={{ width: photo.width, height: photo.height }}
              onClick={()=>openImage(photo.url)}
            >
              <Image src={photo.url} />
              
            </div>
          ))}
        </ul>
      </MarqueeSelection>)
}

export default Cards;


function openImage(url: string): void {
    
}

