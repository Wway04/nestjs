export class QueryPostDto {
    page?: number = 1;
    limit?: number = 10;
    search?: string;
    sortBy?: 'createdAt' | 'title' | 'id' = 'createdAt';
    sortOrder?: 'ASC' | 'DESC' = 'DESC';
    userId?: number;
}
