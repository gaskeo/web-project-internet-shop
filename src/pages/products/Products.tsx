import { useProducts } from '../../shared/api'

import { ProductGrid } from '@widgets/ProductGrid'

export function Products() {
  const { products } = useProducts()

  return <ProductGrid products={products} />
}
