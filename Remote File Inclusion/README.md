######Repositório para a elaboração de um laboratório sobre Remote File Inclusion para disciplina de Segurança da Informação.
---
##LFI - Local File Inclusion / Inclusão de arquivo local

Este tipo de ataque acontece quando a inclusão de ficheiros externos à aplicação principal (libraries, por exemplo) é feita sem validação. Normalmente são utilizados os comandos include() e require().

Uma falha de Local File Inclusion dá a possibilidade de explorar o sistema de arquivos ao atacante.
Sendo assim você consegue por exemplo acessar um arquivo que esteja no C: por exemplo, caso aquele webserver seja Windows.
Ou um arquivo que está na /etc/ caso seja um servidor linux por exemplo.
Dependendo do arquivo que você conseguir ter em mãos, isso pode se tornar um problema bem sério para aquele servidor.
Imagine você tendo em mãos arquivos como log de acessos do servidor, ou até mesmo senhas de acesso ao servidor linux?
Um servidor linux de hospedagem que possui dezenas de sites nele.
Você consegue colocar as mãos no usuario e senha ROOT daquele servidor, loga pelo putty e tem tudo nas suas mãos.

##Explicação de como o Local File Inclusion ocorrem
---
Explicado o que é LFI, vamos ver como seria uma pagina vulneravel a LFI.
```PHP
$pagina = $_GET[pagina];
include($pagina);
?>
```
Esse é um exemplo classico que ->nunca<- deve ser usado.
Porque o ```$pagina``` não foi autenticado e passado diretamente para o website.
Infelizmente esse erro hoje em dia é comum na internet...

Bom, agora que já sabemos como é uma falha LFI, vamos começar a explora-la e usar a nosso favor não é mesmo?
Primeiro vamos entender como essa falha nos da a habilidade de "navegar" por dentro do servidor.

Vamos aprender uma coisa tanto no linux como no windows sobre diretórios, decore isso, mais pra frente você vai precisar:

1. Seu site está em um diretório no servidor, por exemplo no linux (/var/www/) ou no windows (c:/webserver/htdocs/)
2. ./ = acessa o diretório que você já está.
3. ../ = acessa um diretório atras / volta um diretório.

Se você está em C:\Windows\System32\ e faz ./
Você vai continuar em C:\Windows\System32.
Mas se você faz ../
Você vai voltar 1 diretório, ou seja, vai para C:\Windows.

Se você fizer então, ../../ Vai voltar para C:

Agora vamos imaginar uma cena real.
Vamos imaginar que o nosso alvo tem um arquivo, chamado teste.php e esse arquivo fica no (diretório principal)/teste.
Se acessarmos **"www".vitima.com.br/teste/teste.php**, iremos ver o conteúdo desse arquivo, certo?
Mas o local onde detectamos a LFI é na index.php que fica no diretório principal!
Vamos explorar a nossa LFI fazendo o seguinte:

**"www".vitima.com.br/index.php?pagina=teste/teste.php**

WOW, veja o que temos aqui, foi exibido o conteúdo do teste.php na index.php!
Vamos explicar o que aconteceu até agora:

O arquivo index.php tinha uma falha de LFI, igual ao trecho do código que está lá em cima.
O argumento ?pagina= é onde está a falha.
teste/teste.php é igual a acessar o diretório teste, e depois abrir o teste.php

Entenderam? =)

Agora e se fosse ao contrario?
O index.php esta no diretório teste, e o teste.php está no diretório principal?
É ai que entra a explicação sobre diretórios lá em cima.
Se acessarmos "www".vitima.com.br/teste/index.php, iremos acessar a index que contém a falha, porém será a index normal.
E o arquivo que queremos está um diretório acima, "www".vitima.com.br/teste.php
Nesse caso fariamos:

**"www".vitima.com.br/teste/index.php?pagina=../teste.php**

Explicando o que aconteceu dessa vez:
 1. "www".vitima.com.br Site de nossa vitima.
 2. /teste/ acessa o diretório teste no site de nossa vitima.
 3. index.php Arquivo que contém a falha de LFI.
 4. ?pagina= Argumento que da acesso a falha de LFI.
 5. ../ Volta 1 diretório ([Somente usuários registrados podem ver os Links. Clique aqui para se REGISTRAR])
 6. teste.php Arquivo que queremos acessar =)


É possivel brincadeiras com isso como:
Queremos acessar um arquivo que está no (diretório principal)/teste2/teste2.php
E a falha está em (diretório principal)/teste/teste/index.php
Faremos então:
"www".vitima.com.br/teste/teste/index.php?pagina=../../teste2/teste2.php
#Links
---
- [Tutorial LFI](http://forum.guiadohacker.com.br/showthread.php?t=14052)
- [Entendendo mais LFI](http://www.diegomacedo.com.br/vulnerabilidades-de-remotelocal-file-inclusion-rfi-lfi/)
- [WebShells](https://www.myshellcode.com/shell/webadmin.txt)





