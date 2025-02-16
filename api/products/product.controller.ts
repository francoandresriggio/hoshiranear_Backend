import { ProductService } from "./product.service";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "http-status-codes";
import { VercelRequest, VercelResponse } from "@vercel/node";

export class ProductController {
  constructor(private productService: ProductService) {
    this.productService = productService;
  }

  list = async (_req: VercelRequest, res: VercelResponse) => {
    try {
      const data = await this.productService.getProducts();

      if (!data) {
        res.json({
          data: "No products found",
          statusCode: NOT_FOUND,
          statusMessage: "Not Found",
        });
      }

      res.json({ data, statusCode: OK, statusMessage: "OK" });
    } catch (error) {
      console.log(error);
      res.json({
        data: error,
        statusCode: INTERNAL_SERVER_ERROR,
        statusMessage: "Internal Server Error",
      });
    }
  };
}
