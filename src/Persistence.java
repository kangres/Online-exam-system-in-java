import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.servlet.http.HttpServletRequest;

public class Persistence {
  private String path;
  public Persistence(String id) {
    path = "C:/Users/kangres vishwakarma/Downloads/CS156055/.data/" + id;
  }
  
  public String execute(HttpServletRequest b) throws IOException {
    StringBuilder a = new StringBuilder();
    BufferedReader c = b.getReader();
    String line;
    while ((line = c.readLine()) != null) a.append(line);
    String d = a.toString();
    if( d.equals("get")) {
      try (
          InputStream e = new FileInputStream(path);
        ){
          long f = new File(path).length();
          byte[] g = new byte[(int) f];
          e.read(g);
          e.close();
          return new String(g);
        } catch (IOException e) { return ""; }
    } else {
      try(
          OutputStream e = new FileOutputStream(path);
        ) {
          e.write(d.getBytes());
          e.close();
          return "executed";
        } catch (IOException e) { return ""; }
    }
  }
}
