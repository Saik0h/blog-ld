import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { BlogCreatePayload, CourseCreatePayload, MaterialCreatePayload, Message, PostCreatedResponse } from '../../../../core/utils/types';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {
private readonly http = inject(HttpClient);
private readonly url = environment.apiUrl;

createArtigo(data: BlogCreatePayload):Observable<PostCreatedResponse>{
  return this.http.post<PostCreatedResponse>(`${this.url}/articles`, data, {withCredentials: true});
}

createBlog(data: BlogCreatePayload):Observable<PostCreatedResponse>{
  return this.http.post<PostCreatedResponse>(`${this.url}/blogs`, data, {withCredentials: true});
}

createCurso(data: CourseCreatePayload):Observable<Message>{
  return this.http.post<Message>(`${this.url}/courses`, data, {withCredentials: true});
}

createMaterial(data: MaterialCreatePayload):Observable<Message>{
  return this.http.post<Message>(`${this.url}/materials`, data, {withCredentials: true});
}
}
