import { VercelRequest, VercelResponse } from "@vercel/node";
import { createPostgreSQLConection } from "../database";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "http-status-codes";

export default async (req: VercelRequest, res: VercelResponse) => {
  // Manejo de CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Cambia según sea necesario
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS'); // Permitir métodos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Permitir encabezados

  // Manejo de la solicitud
  if (req.method === "OPTIONS") {
    // Si es una solicitud OPTIONS, responde inmediatamente
    return res.status(200).end();
  }

  const dataSource = await createPostgreSQLConection();
  if (!dataSource) {
    return res.status(INTERNAL_SERVER_ERROR).send("Connection failed.");
  }
  const productService = new ProductService(dataSource);
  const productController = new ProductController(productService);

  if (req.method === "GET") return productController.list(req, res);

  return res
    .status(NOT_FOUND)
    .json({ message: "Not Found", statusCode: NOT_FOUND, data: null });
};
