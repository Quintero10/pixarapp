import { initializeIcons, SearchBox, TextField } from '@fluentui/react';
import react from 'react'
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { DefaultButton, IButtonStyles, PrimaryButton } from '@fluentui/react/lib/Button';
import { FontIcon } from '@fluentui/react/lib/Icon';
import axios from 'axios';
import React from 'react';
import Cards from './Cards/Cards';

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};
const buttonStyles: Partial<IButtonStyles> = {
    root:{marginTop:30,marginLeft:30}
  };

  
  type SearchState = {
    cards:[] | null
    
  };

  

  initializeIcons();


  class Search extends React.Component<{},SearchState>
{
    state:SearchState=
    {
      cards:null
    }

    async searchDoggos(breed:string):Promise<void>
  {
    axios.get(`https://dog.ceo/api/breed/${breed}/images`).then(resp => {
     
       if(resp.data.message !=undefined)
       {
        this.setState((state)=>({cards:resp.data.message}))
       }
       else{throw new Error()}
        
    })
    .catch(error=>alert("Texto vacío o raza inexistente!"));
  }

 componentDidUpdate(){
     console.log(this.state.cards?.length);
 }
    render()
    {
        return(<div>
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
              <SearchBox placeholder="Pepu wants doggos of breed..." onSearch={newValue => this.searchDoggos(newValue)} />
            </Stack>
              {this.state.cards?<Cards images={this.state.cards} />:''}
          </div>)
    }
    
}


export default Search;