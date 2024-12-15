import { useSales } from '@shared/api'
import { ProductGrid } from '@widgets/ProductGrid'

export function Sales() {
  const { sales } = useSales()
  return <ProductGrid products={sales} />
}
