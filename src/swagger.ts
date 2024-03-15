import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerTheme } from "swagger-themes";
import { SwaggerThemeNameEnum } from "swagger-themes/build/enums/swagger-theme-name";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("Tria Organizational Structure Management API Documentation")
  
  .setDescription(
    "This API documentation provides details on managing organizational structures within a medium-level organization. It allows users to insert, update, retrieve, and delete department structures, including information such as name, description, and managing department. The API is designed to facilitate efficient management of hierarchical relationships within the organization."
  )
  .setVersion("1.0")
  .build();

const theme = new SwaggerTheme(); // Corrected line
export const swaggerOptions = {
  customSiteTitle: "Tria",
  customfavIcon: "http://triaplc.com/assets/images/favicon/icon.png",
  customCss: `
      ${theme.getBuffer(SwaggerThemeNameEnum.FLATTOP)}
      .topbar-wrapper img { content: url('http://triaplc.com/assets/images/favicon/icon.png'); width:50px; height:auto;}
      .swagger-ui .topbar { background-color: #55ba4a; }
    `,
};
