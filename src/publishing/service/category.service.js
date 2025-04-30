import http from "@/shared/services/http-common.js";

export class CategoryService {
    resourceEndpoint = "/category";

    getAll() {
        return http.get(this.resourceEndpoint);
    }
}