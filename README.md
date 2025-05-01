# Frontend agendamento-servicos-web

- Esse projeto funciona juntamento com o backend que pode ser encontrado [AQUI](https://github.com/j0hnbarbosa/agendamento-servicos-api)

## Crie um arquivo chamado ***.env*** na raiz do projeto e adicione:

```bash
VITE_URL_API=http://localhost:5001/api/v1

VITE_BUILD_PATH=dist

VITE_BASE_URL=/
```

## Install and Run project
```bash
# instalar dependência
npm install

# Executar projeto
npm run dev
```

## O projeto também pode ser executado dentro de um container Docker:
Baixe o Docker na sua máquina [here](https://www.docker.com/products/docker-desktop/)


```bash
 ## Esse comando conta com um PONTO no final que indica o local de onde será pego os arquivos
docker build -t agendamento-servicos-web .

# Executar projeto
docker compose up -d

# Parar execução do projeto
docker compose down
```

## O projeto será executado em: http://localhost:5000
