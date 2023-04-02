import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { ServersService } from "../servers.service";
import { Server } from "./server.component";

export const serverResolver: ResolveFn<Server> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(ServersService).getServer(+route.params['id']);
};