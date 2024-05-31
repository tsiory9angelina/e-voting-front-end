import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// **   Type import 
import {VerticalNavItemsType} from '../config/types'


const SideNav2 =(): VerticalNavItemsType =>{
    return [
        {
          title: 'Dashboard',
          icon: HomeOutline,
          path: '/'
        },
        {
          title: 'Paramètre du compte',
          icon: AccountCogOutline,
          path: '/account-settings'
        },
        {
          sectionTitle: 'Candidats'
        },
        {
          title: 'Voir candidats',
          icon: Login,
          path: '/pages/login',
          openInNewTab: true
        },
        {
          title: 'Creer candidat',
          icon: AccountPlusOutline,
          path: '/candidate/view"',
          openInNewTab: true
        },
        {
          sectionTitle: 'Bureau de vote'
        },
        {
          title: 'voir bureau de vote',
          icon: FormatLetterCase,
          path: '/typography'
        },
        {
          title: 'Creer bureau de vote',
          path: '/icons',
          icon: GoogleCirclesExtended
        },
        {
          sectionTitle: 'Electeur'
        },
        {
          title: 'Voir electeur',
          icon: CreditCardOutline,
          path: '/cards'
        },
        {
          title: 'Creer electeur',
          icon: Table,
          path: '/tables'
        }
      ]
}

export default SideNav2 ;