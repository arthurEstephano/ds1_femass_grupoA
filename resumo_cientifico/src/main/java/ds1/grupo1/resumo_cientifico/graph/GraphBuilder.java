package ds1.grupo1.resumo_cientifico.graph;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import ds1.grupo1.resumo_cientifico.controller.request.PesquisaRs;
import ds1.grupo1.resumo_cientifico.controller.request.PesquisadorRs;
import org.graphstream.graph.*;
import org.graphstream.graph.implementations.*;

import scala.collection.mutable.StringBuilder;

public class GraphBuilder {

    public static void main(String args[]) throws IOException{
        
        List<PesquisadorRs> pesquisadores = new ArrayList<>();
        List<PesquisaRs> pesquisas = new ArrayList<>();

        Graph graph = new SingleGraph("Grafico de relacoes");
        graph.setAttribute("ui.stylesheet",
                "node { size: 5px; text-mode: normal; text-alignment: above; } edge { text-mode: normal; text-alignment: above; }");

        URL url = new URL("http://ec2-18-217-37-108.us-east-2.compute.amazonaws.com:8080/researcher/list");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");

        int responseCode = con.getResponseCode();

        if(responseCode == HttpURLConnection.HTTP_OK){
            StringBuilder sb = new StringBuilder();
            Scanner scanner = new Scanner(con.getInputStream());
            while(scanner.hasNext()){
                sb.append(scanner.nextLine());
            }
            ObjectMapper objectMapper = new ObjectMapper();
            pesquisadores = objectMapper.readValue(String.valueOf(sb), new TypeReference<List<PesquisadorRs>>() {});
        }

        //Desenhando grafo de pesquisadores
        for(PesquisadorRs pesquisador : pesquisadores){
            graph.addNode(pesquisador.getNome()).setAttribute("ui.label", pesquisador.getNome());
        }

        url = new URL("http://ec2-18-217-37-108.us-east-2.compute.amazonaws.com:8080/research/list");
        con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");

        responseCode = con.getResponseCode();

        if(responseCode == HttpURLConnection.HTTP_OK){
            StringBuilder sb = new StringBuilder();
            Scanner scanner = new Scanner(con.getInputStream());
            while(scanner.hasNext()){
                sb.append(scanner.nextLine());
            }
            ObjectMapper objectMapper = new ObjectMapper();
            pesquisas = objectMapper.readValue(String.valueOf(sb), new TypeReference<List<PesquisaRs>>() {});
        }
        
        //Desenhando relações 
        for(int i = 0; i < pesquisas.size(); i++){
            for(int j = i+1; j < pesquisas.size(); j++){
                if(pesquisas.get(i).getPesquisadores().get(0).equals(pesquisas.get(j).getPesquisadores().get(0))) continue;
                
                String p1 = pesquisas.get(i).getPesquisadores().get(0);
                String p2 = pesquisas.get(j).getPesquisadores().get(0);

                if(p1.compareTo(p2) > 0){
                    String temp = p1;
                    p1 = p2;
                    p2 = temp;
                }

                String edgeName = p1 + "-" + p2;
                
                //String edgeName = String.valueOf(pesquisas.get(i).getId()+"-"+String.valueOf(pesquisas.get(j).getId()));
                if( pesquisas.get(i).getNome().equals(pesquisas.get(j).getNome())){
                    try{
                        graph.addEdge(edgeName, pesquisas.get(i).getPesquisadores().get(0), pesquisas.get(j).getPesquisadores().get(0)).setAttribute("ui.label", String.valueOf(1));
                    }catch (IdAlreadyInUseException e){
                        Edge edge = graph.getEdge(edgeName);
                        String peso = edge.getAttribute("ui.label", String.class);
                        int pesoInt = Integer.parseInt(peso);
                        edge.setAttribute("ui.label", String.valueOf(pesoInt+1)); 
                    }
                }
            }
        }

        System.setProperty("org.graphstream.ui", "swing");
        graph.display();
    }
}