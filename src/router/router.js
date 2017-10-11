
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'

export default[
{
  path: '/goods',
  name: 'goods',
  component: goods
},
{
  path: '/ratings',
  name: 'ratings',
  component: ratings
},
{
  path: '/seller',
  name: 'seller',
  component: seller
},
{
  path: '*',
  redirect: '/goods'
}
]
