import http from "@/shared/services/http.instance.js";

export class CategoryService {
    resourceEndpoint = "/category";

    getAll() {
        return http.get(this.resourceEndpoint);
    }
}