import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SpelunkerModule } from 'nestjs-spelunker';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // const tree = SpelunkerModule.explore(app);
  // const root = SpelunkerModule.graph(tree);
  // const edges = SpelunkerModule.findGraphEdges(root);
  // console.log(tree);
  // console.log('graph LR');
  // const mermaidEdges = edges.map(
  //   ({ from, to }) => `  ${from.module.name}-->${to.module.name}`,
  // );
  // console.log(mermaidEdges.join('\n'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
