import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../shared/modelo/usuario';
import {MatTableDataSource} from '@angular/material/table';
import {UsuarioService} from '../../shared/services/usuario.service';
import {IMensagem} from '../../shared/modelo/IMensagem';

@Component({
  selector: 'app-listagem-usuario-tabela',
  templateUrl: './listagem-usuario-tabela.component.html',
  styleUrls: ['./listagem-usuario-tabela.component.css']
})
export class ListagemUsuarioTabelaComponent implements OnInit{

  dataSource: MatTableDataSource<Usuario>;
  Colunas: Array<string> = ['id', 'nome', 'cpf', 'idade', 'telefone', 'ações'];

  constructor(private usuarioService: UsuarioService, private mensagemService: IMensagem) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      usuarios => this.dataSource = new MatTableDataSource(usuarios)
    );
  }

  excluir(usuarioARemover: Usuario): void {
    if (usuarioARemover.id) {
      this.usuarioService.apagar(usuarioARemover.id).subscribe(
        usuarioRemovido => {
          const indx = this.dataSource.data.findIndex(usuario =>
            usuario.id === usuarioARemover.id);
          this.dataSource.data.splice(indx, 1);
          this.dataSource = new MatTableDataSource<Usuario>(this.dataSource.data);
          this.mensagemService.erro('Usuário removido com sucesso!');
        }
      );
    }

  }

}
