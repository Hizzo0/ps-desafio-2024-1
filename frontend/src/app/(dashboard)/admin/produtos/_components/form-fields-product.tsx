'use client'

import { Button } from '@/components/button'
import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { ResponseErrorType, api } from '@/services/api'
import { categoryType } from '@/types/category'
import { productType } from '@/types/product'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/select'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsProductProps {
  product?: productType
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsProduct({
  product,
  readOnly,
  error,
}: FormFieldsProductProps) {
  const { pending } = useFormStatus()
  const [categories, setCategories] = useState<categoryType[]>()
  const [updateImage, setUpdateImage] = useState<string | undefined>()

  const requestData = async () => {
    try {
      const response: categoryType[] = await api.get('/categories')
      setCategories(response)
    } catch (e) {
      return (
        <DashboardContainer className="text-destructive">
          Não foi possivel deletar obter os clubes
        </DashboardContainer>
      )
    }
  }

  useEffect(() => {
    requestData()
  }, [])

  return (
    <>
      <FormFieldsGroup>
        {product && (
          <Input defaultValue={product.id} type="text" name="id" hidden />
        )}
        <FormField>
          <Label htmlFor="name" required={!product}>
            Nome
          </Label>
          <Input
            name="name"
            id="name"
            placeholder="Insira o nome do produto"
            defaultValue={product?.name}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.name}
          />
        </FormField>
        <FormField>
          <Label htmlFor="amount" required={!product}>
            Quantidade do produto
          </Label>
          <Input
            type="number"
            name="amount"
            id="amount"
            placeholder="Insira a quantidade do produto"
            defaultValue={product?.amount}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.amount}
          />
        </FormField>
        <FormField>
          <Label htmlFor="price" required={!product}>
            Preço do Produto
          </Label>
          <Input
            type="number"
            name="price"
            id="price"
            placeholder="Insira o preço do produto"
            defaultValue={product?.price}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.price}
          />
        </FormField>
        <FormField>
          <Label htmlFor="status" required={!product}>
            Status
          </Label>
          <div>
            <div>
              <Label htmlFor="status">Comprado</Label>
              <Input
                type="radio"
                name="status"
                id="status"
                value={0}
                defaultChecked={!product?.status}
                disabled={pending}
                readOnly={readOnly}
                error={error?.errors?.status}
              ></Input>
            </div>
            <div>
              <Label htmlFor="status">Comprar</Label>
              <Input
                type="radio"
                name="status"
                id="status"
                value={1}
                defaultChecked={!product?.status}
                disabled={pending}
                readOnly={readOnly}
                error={error?.errors?.status}
              ></Input>
            </div>
          </div>
        </FormField>
        <FormField>
          <Label htmlFor="category_id" required={!product}>
            Categoria
          </Label>
          <Select
            disabled={pending}
            name="category_id"
            defaultValue={product?.category.id}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria do produto" />
            </SelectTrigger>
            <SelectContent id="category_id">
              <SelectGroup id="category_id">
                <SelectLabel>Categorias</SelectLabel>
                {categories?.map((category: categoryType, index: number) => (
                  <SelectItem value={category.id} key={index}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {error?.errors?.category_id && (
            <p className="text-destructive text xs mt-2">
              {error?.errors?.category_id}
            </p>
          )}
        </FormField>
        <FormField>
          <Label
            htmlFor="image"
            hidden={readOnly && !product?.image}
            required={!product}
          >
            Imagem
          </Label>
          <Input
            name="image"
            id="image"
            type="file"
            accept="image/*"
            disabled={pending}
            hidden={readOnly}
            onChange={(e) => handleImageChange(e, setUpdateImage)}
            error={error?.errors?.image}
          />
          <ImageForm
            className="aspect-square"
            src={updateImage || product?.image}
          />
        </FormField>
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
