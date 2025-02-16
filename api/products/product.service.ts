import { DataSource } from "typeorm";
import { Products } from "./product.model";

export class ProductService {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  getProducts = () => this.dataSource.getRepository(Products).find();
}
