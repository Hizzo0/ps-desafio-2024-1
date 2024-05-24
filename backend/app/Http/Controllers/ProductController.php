<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest; // Importe a classe Request corretamente
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class ProductController extends Controller
{
    private Product $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = $this->product->with('category')->get();

        return response()->json($product, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = url('storage/'.$path);
        }
        $product = $this->product->create($data);
        $id = $product->id;
        $product_category = $product->with('category')->findOrFail($id);

        return response()->json($product_category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = $this->product->with('category')->findOrFail($id);

        return response()->json($product, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, $id)
    {
        $data = $request->validated();
        $product = $this->product->findOrFail($id);
        if ($request->hasFile('image')) {
            try {
                $image_name = explode('product/', $product->image);
                Storage::disk('public')->delete('products'.$image_name[1]);
            } catch (Throwable) {
            } finally {
                $path = $request->file('image')->store('products', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }
        $product->update($data);
        $product_category = $product->with('category')->findOrFail($id);

        return response()->json($product_category, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = $this->product->findOrFail($id);
        $product->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }

    public function updateStatus($id)
    {
        $product = $this->product->findOrFail($id);
        $product->update(['status' => 0]);

        return response()->json($product, Response::HTTP_OK);
    }

    public function updateAmount($id, Request $request)
    {
        $product = $this->product->findOrFail($id);
        $quantityToDecrease = $request->input('quantity', 1); // Quantidade padrão é 1 se não for passada

        if ($product->amount >= $quantityToDecrease) {
            $product->update(['amount' => $product->amount - $quantityToDecrease]);

            return response()->json($product, Response::HTTP_OK);
        } else {
            return response()->json(['message' => 'Quantidade insuficiente do produto'], Response::HTTP_BAD_REQUEST);
        }
    }
}
