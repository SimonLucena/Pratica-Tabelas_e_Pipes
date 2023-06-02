import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../shared/modelo/usuario';
import {USUARIOS} from '../../shared/modelo/USUARIOS';
import {UsuarioService} from '../../shared/services/usuario.service';
import {IMensagem} from '../../shared/modelo/IMensagem';

@Component({
  selector: 'app-listagem-usuarios',
  templateUrl: './listagem-usuarios.component.html',
  styleUrls: ['./listagem-usuarios.component.css']
})
export class ListagemUsuariosComponent implements OnInit{

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private mensagemService: IMensagem) {
  }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      usuariosRetornados =>
        this.usuarios = usuariosRetornados
    );
    console.log('estou aqui');
  }

  excluir(usuarioARemover: Usuario): void {
    if (usuarioARemover.id) {
      this.usuarioService.apagar(usuarioARemover.id).subscribe(
        usuarioRemovido => {
          const indx = this.usuarios.findIndex(usuario =>
            usuario.id === usuarioARemover.id);
          this.usuarios.splice(indx, 1);
          this.mensagemService.erro('Usuário removido com sucesso!');
        }
      );
    }

  }

}
